import { Plant, Plants } from '../plant'

const store = new Plants()
describe('Plant model ', () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined()
  })
  it("index method should return a list of plants", async () => {
    const result = await store.index();
    expect(result).toEqual([])
  })
})