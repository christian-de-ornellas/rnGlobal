import Realm from 'realm';
import InspectionSchema from '../models/InspectionModel';
import UserSchema from '../models/UserModel';
import ListSchema from '../models/ListModel';
import StatusSchema from '../models/StatusModel';
import TypeSchema from '../models/TypeModel';
import LegendsSchema from '../models/LegendsModel';
import ResendSchema from '../models/ResendModel';

const getRealm = () => Realm.open({schema: [InspectionSchema, UserSchema, ListSchema, StatusSchema, TypeSchema, LegendsSchema, ResendSchema]});
export default getRealm;
