package main

import (
	"context"
	"fmt"
	"time"

	"github.com/go-redis/redis/v8"
)

func RedisTest() {
	// Connect to the Redis server
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
	})

	// Set a key with an expiration time of 1 minute
	err := rdb.Set(context.Background(), "mykey", "myvalue", 1*time.Minute).Err()
	if err != nil {
		fmt.Println("Error setting key with expiration:", err)
		return
	}
	fmt.Println("Set key 'mykey' with value 'myvalue' and expiration time in Redis")
}
