import { LocalStorageKey } from '@/core/enums/local-storage-key';
import { IRecord } from '@/core/interfaces/record';
import { ISector } from '@/core/interfaces/sector.interface';
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
        curSector.records.push(data.record);
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
          if (!!record.executionEnd) {
            record.executionEnd = new Date(record.executionEnd);
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
  },
  getters: {
    sectors: (state: any): ISector[] => state.sectors,
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
  },
};
