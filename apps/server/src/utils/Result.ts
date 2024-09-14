import type { Failure } from './Failure';

// Result型を定義
export type Result<Ok, Ng extends Failure> =
  | {
      success: true;
      data: Ok;
    }
  | {
      success: false;
      error: Ng;
    };