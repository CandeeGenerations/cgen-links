import {Link} from '../models/graphql.schema'

export const asyncForEach = async (
  array: any[],
  callback: (item: any, index: number, array: any[]) => void,
) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const sortLinks = (a: Link, b: Link) =>
  a.order
    ? b.order
      ? a.order - b.order
      : -1
    : b.order
    ? 1
    : Number(b.addedTs) - Number(a.addedTs)
