export abstract class ApiEndpoints {
  public static base: string = "https://cautivarte.rodneymarin.com/api"
  public static promo: string = this.base + "/products_promo"
  public static products: string = this.base + "/products"
  public static productByCod: string = this.base + "/product_by_cod?cod="
  public static productsByIds: string = this.base + "/products_by_ids?ids="
  public static productsByCategory: string = this.base + "/products_by_category?id="
  public static categories: string = this.base + "/categories"
  public static categoryById: string = this.base + "/category_by_id?id="
  public static login: string = this.base + "/login"
}
