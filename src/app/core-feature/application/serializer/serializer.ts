export interface Serializer<Model, DAO> {
  serialize?(item: Model): DAO;
}
