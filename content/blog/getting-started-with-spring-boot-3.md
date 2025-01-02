---
title: "Getting Started with Spring Boot 3"
date: "2024-12-29"
category: "Backend Development"
readTime: "5 min read"
description: "Learn how to build modern Java applications with Spring Boot 3 and its new features."
tags: ["java", "spring-boot", "backend"]
language: "en"
---

# Getting Started with Spring Boot 3

Spring Boot 3.0 brings exciting new features and improvements to help you build better Java applications. Let's explore what's new and how to get started.

## What's New in Spring Boot 3?

### Native Support for Jakarta EE 9

Spring Boot 3.0 has moved from `javax.*` packages to `jakarta.*` packages, aligning with Jakarta EE 9.

### Java 17 Baseline

Spring Boot 3.0 requires Java 17 as the minimum version, bringing modern Java features to your applications.

### Native Compilation Support

Better support for GraalVM native compilation, allowing you to create native executables.

## Getting Started

First, let's create a new Spring Boot 3 project. You can use Spring Initializr or start with this basic `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.0</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>
```

## Creating Your First REST Controller

Here's a simple REST controller using Spring Boot 3:

```java
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot 3!";
    }
}
```

Stay tuned for more detailed tutorials on each of these topics!
