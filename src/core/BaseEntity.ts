export abstract class BaseEntity {
	// TODO: Remove this method if you don't need it
	/**
	 * You need to override this function to customize the JSON output of class-transformer library
	 * @returns
	 */
	// toJSON(): Record<string, any> {
	// 	const record = instanceToPlain(this);
	// 	// Remove all double underscores `__` from all properties when serializing object
	// 	const cleanUnderscoresProperties = (obj: any): void => {
	// 		for (const [key, val] of Object.entries(obj)) {
	// 			if (key.startsWith("__") && key.endsWith("__")) {
	// 				const newKey = key.substring(2, key.length - 2);
	// 				obj[newKey] = val;
	// 				delete obj[key];
	// 			}
	// 			// Check if the value is an object and not null
	// 			if (typeof val === "object" && val !== null) {
	// 				if (Array.isArray(val)) {
	// 					// If the value is an array, iterate over all items in the array
	// 					val.forEach((item) => {
	// 						if (typeof item === "object" && item !== null) {
	// 							cleanUnderscoresProperties(item);
	// 						}
	// 					});
	// 				} else {
	// 					cleanUnderscoresProperties(val);
	// 				}
	// 			}
	// 		}
	// 	};
	// 	if (record != null) {
	// 		cleanUnderscoresProperties(record);
	// 	}
	// 	return record;
	// }
	// abstract equals(entity: BaseEntity): boolean;
	// abstract isNew(): boolean;
}
