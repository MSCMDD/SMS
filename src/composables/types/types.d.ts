// types.d.ts

/**
 * 社团数据库
 *
 */
export interface ClubType {
  name: string
  navdetail: string
  detial: string
  navs?: {
    value: string
    to: string
  }[]
}
export interface ClubsType {
  [Club: string]: ClubType
}
