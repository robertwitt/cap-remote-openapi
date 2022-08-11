namespace db;

using {
  Country,
  cuid
} from '@sap/cds/common';

type Address : {
  country     : Country;
  city        : String;
  postalCode  : String(10);
  addressLine : String;
}

entity Sites : cuid {
  name          : String;
  postalAddress : Address;
}
