export class Link {
  id!: string
  code!: string
  original_url!: string
  created_at!: Date

  constructor(code: string, original_url: string) {
    this.code = code
    this.original_url = original_url
  }
}
