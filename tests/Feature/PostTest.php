<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class PostTest extends TestCase
{

    use RefreshDatabase;

    public function test_post_by_authenticated_user() {
        $user = User::factory()->create();

        $this->actingAs($user);

        $postData = [
            'content' => 'test',
            'latitude' => 0.0,
            'longitude' => 0.0,
        ];

        $response = $this->postJson('posts', $postData);

        $response->assertStatus(201);

        $postData['author_id'] = auth()->id();

        $this->assertDatabaseHas('posts', $postData);
    }

    public function test_post_by_unauthenticated_user() {

        $postData = [
            'content' => 'test',
            'latitude' => 0.0,
            'longitude' => 0.0,
        ];

        $response = $this->postJson('posts', $postData);

        $response->assertStatus(401);

    }

}
