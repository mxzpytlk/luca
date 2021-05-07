import { IRecord } from '@/core/interfaces/record.interface';
import recordsStore from './records';

export default {
  state: {
    filterDate: new Date(),
    filterRecords: new Set<IRecord>(),
  },
  mutations: {
    changeFilterDate(state: any, newDate: Date) {
      state.filterDate = newDate;
      state.filterRecords = new Set();
    },

    makeRecordsImportant(state: any, records: IRecord[]) {
      state.filterRecords = new Set(records);
    },

  },
  getters: {
    filterDate: (state: any): Date => state.filterDate,

    isToday(state: any): boolean {
      return new Date().toDateString() === state.filterDate.toDateString();
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

  },
  actions: {
    chandgeDate({commit}: any, date: Date) {
      commit('changeFilterDate', date);
    },
  },
  modules: { recordsStore },
};
