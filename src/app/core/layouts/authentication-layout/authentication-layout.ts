import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-authentication-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './authentication-layout.html',
  styleUrl: './authentication-layout.css',
})
export class AuthenticationLayout {}
