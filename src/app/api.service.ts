import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private socket!: Socket;

  connect(): void {
    if (!this.socket) {
      this.socket = io('http://localhost:3000');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  joinRoom(roomId: string): void {
    this.connect();
    this.socket.emit('join-room', roomId);
  }

  leaveRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('leave-room', roomId);
      this.disconnect();
    }
  }

  sendOffer(to: string, offer: RTCSessionDescriptionInit): void {
    this.socket.emit('offer', { to, offer });
  }

  sendAnswer(to: string, answer: RTCSessionDescriptionInit): void {
    this.socket.emit('answer', { to, answer });
  }

  sendIceCandidate(to: string, candidate: RTCIceCandidate): void {
    this.socket.emit('ice-candidate', { to, candidate });
  }

  onUserJoined(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('user-joined', (id: string) => {
        observer.next(id);
      });
    });
  }

  onOffer(): Observable<{ from: string; offer: RTCSessionDescriptionInit }> {
    return new Observable(observer => {
      this.socket.on('offer', (data) => observer.next(data));
    });
  }

  onAnswer(): Observable<{ from: string; answer: RTCSessionDescriptionInit }> {
    return new Observable(observer => {
      this.socket.on('answer', (data) => observer.next(data));
    });
  }

  onIceCandidate(): Observable<{ from: string; candidate: RTCIceCandidate }> {
    return new Observable(observer => {
      this.socket.on('ice-candidate', (data) => observer.next(data));
    });
  }

  onUserLeft(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('user-left', (id: string) => {
        observer.next(id);
      });
    });
  }
}
