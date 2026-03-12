export type DbPressRelease = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  category: string | null
  author: string | null
  published: boolean | null
  created_at: string | null
  updated_at: string | null
}

export const mapDbPressReleaseSummary = (article: DbPressRelease) => ({
  id: article.id,
  title: article.title,
  slug: article.slug,
  excerpt: article.excerpt ?? "",
  coverImage: article.cover_image ?? "",
  category: article.category ?? "",
  author: article.author ?? "",
  published: Boolean(article.published),
  createdAt: article.created_at,
  updatedAt: article.updated_at
})

export const mapDbPressReleaseDetail = (article: DbPressRelease) => ({
  ...mapDbPressReleaseSummary(article),
  content: article.content ?? ""
})
