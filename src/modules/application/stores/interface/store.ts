import {TYPES} from '../../../../lib/constants/types.constant';

export type Store = {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  address: string;
};

export type StoreWithDistance = {
  id: string;
  name: string;
  type: typeof TYPES;
  lat: number;
  lng: number;
  address: string;
  distance: number;
};

export type StoreWithDistanceResponse = Pick<
  StoreWithDistance,
  'id' | 'name' | 'type' | 'address' | 'distance'
> & {latitude: number; longitude: number};

