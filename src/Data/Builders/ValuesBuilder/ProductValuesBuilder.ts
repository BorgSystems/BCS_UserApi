import IBuilder from "../IBuilder";
import ProductValues from "../../../Models/Shop/ProductValues";

export default class ProductValuesBuilder implements IBuilder<ProductValues> {
    private _productValues: ProductValues;
    constructor() {
        this._productValues = new ProductValues();
    }

    setTitle(title: string) {
        this._productValues.Title = title;
        return this;
    }

    setDescription(description: string) {
        this._productValues.Description = description;
        return this;
    }

    setSlug(slug: string) {
        this._productValues.Slug = slug;
        return this;
    }

    setCategory(category: string) {
        this._productValues.Category = category;
        return this;
    }

    setImagesPath(imagesPath: string[]) {
        this._productValues.ImagesPath = imagesPath;
        return this;
    }

    build(): ProductValues {
        return this._productValues.clone();
    }

}