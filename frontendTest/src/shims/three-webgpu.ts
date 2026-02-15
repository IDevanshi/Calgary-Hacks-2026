import { InstancedBufferAttribute, WebGLRenderer } from 'three';

export class StorageInstancedBufferAttribute extends InstancedBufferAttribute {
  constructor(count: number, itemSize: number, normalized = false) {
    super(new Float32Array(count * itemSize), itemSize, normalized);
  }
}

export class WebGPURenderer extends WebGLRenderer {
  async computeAsync(): Promise<void> {
    throw new Error('WebGPU compute is unavailable in this HTTP context. Use localhost or HTTPS.');
  }

  async getArrayBufferAsync(attribute?: { array?: ArrayBufferView }): Promise<ArrayBuffer> {
    const array = attribute?.array;
    if (array?.buffer instanceof ArrayBuffer) {
      return array.buffer.slice(0);
    }

    return new ArrayBuffer(0);
  }
}

// three/tsl imports { TSL } from 'three/webgpu'.
// Exporting an empty object avoids import-time crashes on insecure contexts.
export const TSL = {};
