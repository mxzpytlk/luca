import { ApiHref } from '@/core/enums/api.enum';
import { IRecord } from '@/core/interfaces/record';
import { ISector } from '@/core/interfaces/sector.interface';
import { get, remove } from '@/core/utills/api.utills';

export default {
  state: {
    sectors: [],
  },
  mutations: {

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

  },
  getters: {
    sectors: (state: any): ISector[] => state.sectors,


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
    async deleteSectors({ commit }: any,  sectors: ISector[]) {
      const removeIds = new Set(sectors.map((sector) => sector.id));
      await remove(ApiHref.DELETE_SECTOR, {
        removeIds: Array.from(removeIds),
      });
      commit('removeSectors', sectors);
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
