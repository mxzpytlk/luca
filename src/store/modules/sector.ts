import { ApiHref } from '@/core/enums/api.enum';
import { LocalStorageKey } from '@/core/enums/local-storage-key';
import { IRecord } from '@/core/interfaces/record';
import { ISector } from '@/core/interfaces/sector.interface';
import { get, post, remove } from '@/core/utills/api.utills';
import { flatArr } from '@/core/utills/array.utills';
import { setInLocalStorage } from '@/core/utills/local-storage.utills';

export default {
  state: {
    sectors: [],
    filterDate: new Date(),
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


    changeFilterDate(stae: any, newDate: Date) {
      stae.filterDate = newDate;
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

    todayRecords(state: any) {
      const records = flatArr((state.sectors as ISector[]).map((sector) => sector.records));
      return records.filter((recors) => recors.executionDate?.toDateString() === state.filterDate.toDateString());
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
    async addRecord({ commit, state }: any, data: { record: IRecord, title: string }) {
      const { title, record } = data;

      const res = await post(ApiHref.ADD_RECORD, { title, record });
      const id = res?.data?.id;
      commit('pushRecord', { title, record, id });
    },
    async deleteSectors({ commit }: any,  sectors: ISector[]) {
      const removeIds = new Set(sectors.map((sector) => sector.id));
      const res = await remove(ApiHref.DELETE_SECTOR, {
        removeIds: Array.from(removeIds),
      });
      commit('removeSectors', sectors);
    },
    async removeRecord({commit}: any, record: IRecord) {
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
