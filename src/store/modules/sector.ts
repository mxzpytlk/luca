import { LocalStorageKey } from '@/core/enums/local-storage-key';
import { IRecord } from '@/core/interfaces/record';
import { ISector } from '@/core/interfaces/sector.interface';
import { flatArr } from '@/core/utills/array.utills';
import { getFromLocalStorage, setInLocalStorage } from '@/core/utills/local-storage.utills';
import { generateId } from '@/core/utills/random.utills';

export default {
  state: {
    sectors: [],
  },
  mutations: {
    pushRecord(state: any, data: { record: IRecord, title: string }) {
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
          id: generateId(),
        });
      }
      setInLocalStorage(LocalStorageKey.SECTORS, sectors);
    },
    loadRecords(state: any) {
      const sectors: ISector[] = getFromLocalStorage(LocalStorageKey.SECTORS) || [];
      for (const sector of sectors) {
        for (const record of sector.records) {
          if (!!record.executionDate) {
            record.executionDate = new Date(record.executionDate);
          }
        }
      }
      state.sectors = sectors;
    },
    removeSectors(state: any, removingSectors: ISector[]) {
      const removeIds = new Set(removingSectors.map((sector) => sector.id));
      state.sectors = state.sectors.filter((sector: ISector) => !removeIds.has(sector.id));
      setInLocalStorage(LocalStorageKey.SECTORS, state.sectors);
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
      setInLocalStorage(LocalStorageKey.SECTORS, state.sectors);
    },
  },
  getters: {
    sectors: (state: any): ISector[] => state.sectors,

    todayRecords(state: any) {
      const records = flatArr((state.sectors as ISector[]).map((sector) => sector.records));
      return records.filter((recors) => recors.executionDate?.toDateString() === new Date().toDateString());
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
      commit('pushRecord', data);
    },
    async deleteSectors({ commit }: any,  sectors: ISector[]) {
      commit('removeSectors', sectors);
    },
    async updateRecords({commit}: any) {
      commit('loadRecords');
    },
    async removeRecord({commit}: any, record: IRecord) {
      commit('removeRecord', record);
    },
  },
};
