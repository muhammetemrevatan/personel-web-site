# Spring Boot 3 ile İlk Adımlar

Spring Boot 3.0, Java uygulamaları geliştirmeyi kolaylaştıran yeni özellikler ve iyileştirmeler getiriyor. Yeniliklere ve başlangıç adımlarına bakalım.

## Spring Boot 3'te Neler Yeni?

### Jakarta EE 9 Desteği

Spring Boot 3.0, Jakarta EE 9 ile uyum sağlamak için `javax.*` paketlerinden `jakarta.*` paketlerine geçti.

### Java 17 Gereksinimi

Spring Boot 3.0 için minimum Java sürümü 17'dir. Böylece modern Java özellikleri uygulamalarda kullanılabilir.

### Yerel Derleme Desteği

GraalVM yerel derlemesi için geliştirilen destek, yerel çalıştırılabilir dosyalar oluşturmayı kolaylaştırır.

## Başlangıç

Yeni bir Spring Boot 3 projesi oluşturmak için Spring Initializr kullanabilir veya aşağıdaki temel `pom.xml` dosyasıyla başlayabilirsiniz:

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

## İlk REST Controller'ınızı Oluşturmak

Basit bir REST controller örneği:

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

Bu konuların her biri, daha ayrıntılı uygulamalar ve örneklerle incelenebilir.
