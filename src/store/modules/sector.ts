import { ISector } from '@/core/interfaces/sector.interface';
import { generateId } from '@/core/utills/random.utills';

export default {
  state: {
    sectors: [
      {
        id: generateId(),
        title: 'Test1',
        records: [
          {
            id: generateId(),
            text: 'Test1.1',
            executionEnd: new Date(),
          },
          {
            id: generateId(),
            text: 'Test1.2',
          },
          {
            id: generateId(),
            text: 'Test1.3',
          },
          {
            id: generateId(),
            text: 'Test1.4',
            executionEnd: new Date('2014-12-10'),
          },
          {
            id: generateId(),
            text: 'Test1.5',
          },
        ],
      },
      {
        id: generateId(),
        title: 'Test2',
        records: [
          {
            id: generateId(),
            text: 'Test2.1',
          },
          {
            id: generateId(),
            text: 'Test2.2',
          },
          {
            id: generateId(),
            text: 'Test2.3',
          },
        ],
      },
      {
        id: generateId(),
        title: 'Test3',
        records: [
          {
            id: generateId(),
            text: 'Test3.1',
          },
          {
            id: generateId(),
            text: 'Test3.2',
          },
          {
            id: generateId(),
            text: 'Test3.3',
          },
          {
            id: generateId(),
            text: 'Test3.4',
          },
          {
            id: generateId(),
            text: 'Test3.5',
          },
        ],
      },
      {
        id: generateId(),
        title: 'Test4',
        records: [
          {
            id: generateId(),
            text: 'Test4.1',
          },
        ],
      },
      {
        id: generateId(),
        title: 'Test5',
        records: [
          {
            id: generateId(),
            text: 'Test5.1',
          },
          {
            id: generateId(),
            text: 'Test5.2',
          },
          {
            id: generateId(),
            text: 'Test5.3',
          },
        ],
      },
    ],
  },
  mutations: {},
  getters: {
    sectors: (state: any): ISector[] => state.sectors,
  },
  actions: {},
};
