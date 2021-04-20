import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Panel {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly status: string;
  readonly description?: string;
  readonly dataSource?: number;
  constructor(init: ModelInit<Panel>);
  static copyOf(source: Panel, mutator: (draft: MutableModel<Panel>) => MutableModel<Panel> | void): Panel;
}

export declare class DataSource {
  readonly id: string;
  readonly payload: string;
  constructor(init: ModelInit<DataSource>);
  static copyOf(source: DataSource, mutator: (draft: MutableModel<DataSource>) => MutableModel<DataSource> | void): DataSource;
}