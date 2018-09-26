import * as mathNative from 'mathjs';

mathNative.createUnit('kcal', '4184 J');

export const math = mathNative;
export type Unit = mathNative.Unit;