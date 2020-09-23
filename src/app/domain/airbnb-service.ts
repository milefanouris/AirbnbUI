// Generated using typescript-generator version 2.0.400 on 2020-09-04 19:12:46.

export interface CommentDto {
  commentId: number;
  comment: string;
  grade: number;
  username: string;
}

export interface NewMessageDto {
  fromUser: string;
  toUser: string;
  messageText: string;
}

export interface AddCommentToResidenceDto {
  residenceId: number;
  comment: string;
  grade: number;
  username: string;
}

export class AddResidenceRequestDto {
  address: string;
  geoX: number;
  geoY: number;
  datesReserved: string;
  capacity: number;
  prize: number;
  type: string;
  rules: string;
  description: string;
  bathrooms: number;
  size: number;
  bedrooms: number;
  livingRoom: boolean;
  location: string;
  username: string;
  photoPaths: string[];
  title: string;
  beds: number;
}

export class AddResidenceResponseDto {
  residenceId: number;
  address: string;
  geoX: number;
  geoY: number;
  datesReserved: string;
  capacity: number;
  prize: number;
  type: string;
  rules: string;
  description: string;
  bathrooms: number;
  size: number;
  bedrooms: number;
  beds: number;
  livingRoom: boolean;
  location: string;
  username: string;
  photoPaths: string[];
  comments: CommentEntity[];
  reservationInfo: ReservationEntity[];
}

export interface ReservationDto {
  username: string;
  residenceId: number;
  arrivalDate: Date;
  departureDate: Date;
}

export interface SearchResidenceByIdDto {
  residenceId: number;
}

export class SearchResidenceDto {
  username: string;
  location: string;
  arrivalDate: Date;
  departureDate: Date;
  capacity: number;
}

export interface SessionInfo {
  username: string;
  date: Date;
}

export class UserLogInRequestDto {
  username: string;
  password: string;
}

export interface UserLogInResponseDto {
  username: string;
  authToken: string;
  roleDtos: RoleDto[];
  photo: string;
}

export interface UserProfileDto {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  city: string;
  photo: string;
  comments: CommentEntity[];
  roleDtos: RoleDto[];
}

export class UserRegisterRequestDto {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  photoPath: string;
  roleDtos: RoleDto[];
}

export interface UserRegisterResponseDto {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  city: string;
  photo: string;
  roleDtos: RoleDto[];
}

export class UserUpdateProfileDto {
  username: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  city: string;
  photo: string;
  roleDtos: RoleDto[];
}

export class UserUtilsDto {
  username: string;
}

export interface CommentEntity {
  commentId: number;
  comment: string;
  grade: number;
}

export interface ReservationEntity extends Serializable {
  arrivalDate: Date;
  departureDate: Date;
}

export interface Serializable {
}

export type RoleDto = 'HOST' | 'TENANT';
