import { v4 as uuid } from "uuid";

export class BlobStore {
  storage;
  constructor() {
    this.storage = {};
  }

  pushToBlobStore(blobData, asArray) {
    const uuidToUse = uuid();
    this.storage[uuidToUse] = asArray ? [blobData] : blobData;
    return uuidToUse;
  }

  appendToBlobStore(blobUUID, blobData) {
    const uuidToUse = uuid();
    this.storage[blobUUID] = Array.isArray(this.storage[blobUUID])
      ? this.storage[blobUUID].push(blobData)
      : [this.storage[blobUUID], blobData];
    return uuidToUse;
  }

  removeFromBlobStore(blobUUID) {
    delete this.storage[blobUUID];
  }

  getFromBlobStore(blobUUID) {
    return this.storage[blobUUID];
  }
}
