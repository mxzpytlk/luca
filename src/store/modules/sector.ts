import { ApiHref } from '@/core/enums/api.enum';
import { IRecord } from '@/core/interfaces/record';
import { ISector } from '@/core/interfaces/sector.interface';
import { get, post, remove } from '@/core/utills/api.utills';
import { flatArr } from '@/core/utills/array.utills';

export default {
  state: {
    sectors: [],
    filterDate: new Date(),
    filterRecords: new Set<IRecord>(),
  },
  mutations: {

    pushRecord(state: any, data: { record: IRecord, title: string, id: string }) {
      const sectors = (state.sectors as ISector[]);
      const curSector = sectors.find((item) => item.title === data.title);
      if (curSector) {
        const curRecordIdx = curSector.records.findIndex((item) => item.id === data.record.id);
        if (curRecordIdx >= 0) {
          curSector.records[curRecordIdx] = data.record;
        } else {
          curSector.records.push(data.record);
        }
      } else {
        sectors.push({
          title: data.title,
          records: [data.record],
          id: data.id,
        });
      }
    },


    setSectors(state: any, sectors: ISector[]) {
      for (const sector of sectors) {
        sector.id =  sector?._id || sector.id;
        for (const record of sector.records) {
          if (!!record.executionDate) {
            record.executionDate = new Date(record.executionDate);
          }
          record.id =  record?._id || record.id;
        }
      }
      state.sectors = sectors;
    },


    removeSectors(state: any, removingSectors: ISector[]) {
      const removeIds = new Set(removingSectors.map((sector) => sector.id));
      state.sectors = state.sectors.filter((sector: ISector) => !removeIds.has(sector.id));
    },


    changeFilterDate(state: any, newDate: Date) {
      state.filterDate = newDate;
      state.filterRecords = new Set();
    },

    makeRecordsImportant(state: any, records: IRecord[]) {
      state.filterRecords = new Set(records);
    },


    removeRecord(state: any, record: IRecord) {
      const sectors: ISector[] = state.sectors;
      const curSectorIdx = sectors.findIndex((sector) => sector.records.find((item) => item.id === record.id));
      const curSector = sectors[curSectorIdx];
      const curRecordIdx = curSector.records.findIndex((item) => item.id === record.id);
      curSector.records.splice(curRecordIdx, 1);
      if (curSector.records.length === 0) {
        sectors.splice(curSectorIdx, 1);
      }
    },

  },
  getters: {
    sectors: (state: any): ISector[] => state.sectors,

    filterDate: (state: any): Date => state.filterDate,

    allRecords(state: any) {
      return flatArr((state.sectors as ISector[]).map((sector) => sector.records));
    },

    todayRecords(state: any, getters: any): IRecord[] {
      const records = getters.allRecords;
      return records
        .filter((record: IRecord) => record.executionDate?.toDateString() === state.filterDate.toDateString());
    },

    isImportant(state: any) {
      return (record: IRecord) => {
        return (state.filterRecords.size === 0
                && state.filterDate.toDateString() === record?.executionDate?.toDateString())
              || state.filterRecords.has(record);
      };
    },

    record(state: any): (id: string) => IRecord {
      return (id: string) => {
        for (const sector of state.sectors) {
          for (const record of sector.records) {
            if (id === record.id) {
              return record;
            }
          }
        }
      };
    },


    sectorTitle(state: any): (recordId: string) => IRecord {
      return (recordId: string) => {
        for (const sector of state.sectors) {
          for (const record of sector.records) {
            if (recordId === record.id) {
              return sector.title;
            }
          }
        }
      };
    },


  },
  actions: {
    async addRecord({ commit }: any, data: { record: IRecord, title: string }) {
      const { title, record } = data;

      const res = await post(ApiHref.ADD_RECORD, { title, record });
      const id = res?.data?.id;
      commit('pushRecord', { title, record, id });
    },


    async deleteSectors({ commit }: any,  sectors: ISector[]) {
      const removeIds = new Set(sectors.map((sector) => sector.id));
      await remove(ApiHref.DELETE_SECTOR, {
        removeIds: Array.from(removeIds),
      });
      commit('removeSectors', sectors);
    },

    async updateRecord({ }: any, record: IRecord) {
      await post(ApiHref.UPDATE_RECORD, { record });
    },

    async removeRecord({commit}: any, record: IRecord) {
      await remove(ApiHref.DELETE_RECORD, record );
      commit('removeRecord', record);
    },
    async chandgeDate({commit}: any, date: Date) {
      commit('changeFilterDate', date);
    },
    async updateSectors({ commit }: any, sectors: ISector[]) {
      commit('setSectors', sectors);
    },
    async loadRecords({ commit }: any) {
      const res = await get(ApiHref.GET_SECTORS);
      const sectors: ISector[] = res?.data?.sectors;
      commit('setSectors', sectors);
    },
  },
};
