import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as fromPins from '../reducers/pins';
import { Pin } from '../models/pin';
import { Comment } from '../models/comment';
import { environment } from '../../environments/environment';
import { ApiUrl } from '../app.api-url';
import { HttpService } from './http';

@Injectable()
export class PinDataService {
  PinState: Observable<fromPins.State>;
  pinsOffset: number = 0;

  constructor(
    public db: AngularFireDatabase,
    public http: HttpService
  ) {
  };

  getPins(search_string, offset=0): Observable<Pin[]> {
    let query = `pins?limit=20&offset=${offset}`;

    if(search_string && search_string.length) {
      query += `&tags=${search_string}`
    }

    return this
      .http.get(query)
      .map(res => res.json().data)
      .map(pins => {
        this.pinsOffset += pins.length;
        return pins.map(pin => new Pin(pin));
      })
  }

  getPin(id: string): Observable<Pin> {
    return this
      .http.get(`pins/${id}`)
      .map(res => res.json().data)
      .map(pin => new Pin(pin))
  }

  addPin(pin: Pin): Observable<Pin> {
    return this
      .http.post('pins', {pin: pin})
      .map(res => res.json().data)
      .map(pin => new Pin(pin));
  }

  savePin(pin: Pin): Observable<Pin> {
    return this
      .http.put(`pins/${pin.id}`, { pin: pin })
      .map(res => res.json().data)
      .map(pin => new Pin(pin));
  }

  deletePin(id): Observable<string> {
    return this
      .http.delete(`pins/${id}`)
      .map(() => id);
  }

  getComments(pinId: string): Observable<Comment[]> {
    return this
      .http.get(`pins/${pinId}`)
      .map(res => res.json().data.comments)
      .map(comments => comments)
  }

  addComment(comment: Comment): Observable<Comment> {
    return this
      .http.post('comments', {comment: comment})
      .map(res => res.json().data)
      .map(comment => new Comment(comment));
  }

  deleteComment(id): Observable<string> {
    return this
      .http.delete(`comments/${id}`)
      .map(() => id);
  }
}