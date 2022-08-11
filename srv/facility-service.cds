using {db} from '../db/schema';

service FacilityService {

  type Weather : {
    condition   : String;
    temparature : Decimal(5, 2);
    humidity    : Decimal(5, 2);
    windSpeed   : Decimal(5, 2);
  }

  entity Sites as projection on db.Sites actions {
    function getCurrentWeather() returns Weather;
  }
};
