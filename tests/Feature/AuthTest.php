<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{

    use RefreshDatabase;

    public function test_user_login_with_correct_credentials() {
        $user = User::factory()->create([
            'name' => 'test',
            'email' => 'test@mail.com',
            'password' => 'Password123!'
        ]);

        $response = $this->post('/login', [
            'email' => 'test@mail.com',
            'password' => 'Password123!'
        ]);

        $this->assertAuthenticatedAs($user);
    }

    public function test_user_login_with_invalid_credentials() {
        $user = User::factory()->create([
            'name' => 'test',
            'email' => 'test@mail.com',
            'password' => 'Password123!'
        ]);

        $response = $this->post('/login', [
            'email' => 'test@mail.com',
            'password' => 'wrongpassword!'
        ]);

        $this->assertGuest();
    }

    public function test_user_register() {

        $email = 'test@mail.com';

        $response = $this->post('register', [
            'name' => 'test',
            'email' => $email,
            'password' => 'Password123!'
        ]);

        $this->assertDatabaseHas('users', [
            'email' => $email
        ]);

        $this->assertAuthenticated();

    }

}
