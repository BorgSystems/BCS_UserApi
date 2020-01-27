import ValuesBase from "../ValuesBase";
import IClonable from "../Interfaces/IClonable";

export default class ProductValues extends ValuesBase implements IClonable<ProductValues> {

    public Title?: string;
    public Description?: string;
    public Slug?: string;
    public Category?: string;
    public ImagesPath?: string[];
    clone(oldValues?: ProductValues): ProductValues {
        if(oldValues)
            this.saveOldValues(oldValues);
        const copy = new ProductValues();
        copy.id = this.id;
        copy.Title = this.Title;
        copy.Description = this.Description;
        copy.Slug = this.Slug;
        copy.Category = this.Category;
        copy.ImagesPath = this.ImagesPath;
        return copy;
    }

}