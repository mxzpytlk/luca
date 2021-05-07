import { ApiHref } from '@/core/enums/api.enum';
import { IRecord } from '@/core/interfaces/record';
import { ISector } from '@/core/interfaces/sector.interface';
import { post, remove } from '@/core/utills/api.utills';
import { flatArr } from '@/core/utills/array.utills';
import sectorStore from './sector';

export default {
  mutations: {

    pushRecord(state: any, data: { record: IRecord, title: string, id: string }) {
      const sectors = (state.sectorStore.sectors as ISector[]);
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


    removeRecord(state: any, record: IRecord) {
      const sectors: ISector[] = state.sectorStore.sectors;
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

    allRecords(state: any) {
      return flatArr((state.sectorStore.sectors as ISector[]).map((sector) => sector.records));
    },


    record(state: any): (id: string) => IRecord {
      return (id: string) => {
        for (const sector of state.sectorStore.sectors) {
          for (const record of sector.records) {
            if (id === record.id) {
              return record;
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

    async updateRecord({ }: any, record: IRecord) {
      await post(ApiHref.UPDATE_RECORDS, { records: [record] });
    },

    async removeRecord({commit}: any, record: IRecord) {
      await remove(ApiHref.DELETE_RECORD, record );
      commit('removeRecord', record);
    },

    async copyPreviousDayPlan({ getters }: any) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const changedRecords: IRecord[] = getters.allRecords
        .filter((record: IRecord) => yesterday.toDateString() === record.executionDate?.toDateString());
      changedRecords.forEach((record) => {
        record.executionDate = new Date();
      });
      await post(ApiHref.UPDATE_RECORDS, { records: changedRecords });
    },

  },
  modules: { sectorStore },
};
