namespace db;

using {cuid} from '@sap/cds/common';

type Coordinate : Decimal(15, 7);

entity Sites : cuid {
  name      : String;
  longitude : Coordinate;
  latitude  : Coordinate;
}
