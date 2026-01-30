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

interface MdFile {
  title: string // 标题，字符串类型
  cover?: string // 封面图 URL，可选属性
  date?: string // 发布日期，可选属性
  pin?: boolean // 是否置顶，可选属性
  tags?: string[] // 标签数组，可选属性
  desc?: string // 描述，可选属性
}
