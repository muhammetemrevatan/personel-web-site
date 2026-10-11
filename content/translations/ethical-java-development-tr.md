# Java'da Temiz Kod: Spring Boot Geliştiricileri İçin Rehber

Spring Boot geliştiricileri olarak yalnızca uygulama değil, ekip arkadaşlarımızın yıllarca üzerinde çalışacağı kod tabanları oluşturuyoruz. Temiz ve bakımı kolay Java kodu, ekipteki herkesin işini kolaylaştırır.

## Temiz Java Kodunun Temel İlkeleri

### 1. Açık Sınıf Yapısı

Sorumlulukları tek bir sınıfta toplamak yerine sınıfların görevlerini belirgin tutun. Aşağıdaki örnek, kullanıcı kaydını odaklı bir servis ve olay yayınlama yaklaşımıyla ele alır.

```java
// Bad: Mixing concerns and unclear responsibilities
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PaymentService paymentService;

    public void registerUser(UserDTO dto) {
        User user = new User(dto);
        userRepository.save(user);
        emailService.sendWelcomeEmail(user);
        paymentService.setupBillingAccount(user);
    }
}

// Good: Single Responsibility and Clear Structure
@Service
@RequiredArgsConstructor
public class UserRegistrationService {
    private final UserRepository userRepository;
    private final UserRegistrationEventPublisher eventPublisher;

    @Transactional
    public User registerUser(UserRegistrationRequest request) {
        User user = UserMapper.toEntity(request);
        validateUserData(user);
        User savedUser = userRepository.save(user);
        eventPublisher.publishUserRegistered(savedUser);
        return savedUser;
    }
}
```

### 2. Etkili İstisna Yönetimi

Her hatayı genel bir sunucu hatasına dönüştürmek yerine bulunamayan kullanıcı ve erişim reddi gibi durumları ayrı ele alın.

```java
// Bad: Generic exception handling
@GetMapping("/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    try {
        return ResponseEntity.ok(userService.getUser(id));
    } catch (Exception e) {
        return ResponseEntity.status(500).build();
    }
}

// Good: Specific exception handling with custom exceptions
@GetMapping("/{id}")
public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
    try {
        UserResponse user = userService.getUser(id);
        return ResponseEntity.ok(user);
    } catch (UserNotFoundException e) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    } catch (UserAccessDeniedException e) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
    }
}
```

### 3. Temiz Repository Yaklaşımı

Karmaşık sorguları tek bir metotta biriktirmek yerine sorgu koşullarını ayrı specification bileşenlerinde ifade edebilirsiniz.

```java
// Bad: Complex queries in repository
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.status = 'ACTIVE' " +
           "AND u.lastLoginDate > ?2 AND u.subscriptionType = ?3")
    Optional<User> findActiveUserByEmailAndSubscription(String email,
        LocalDateTime date, String subscriptionType);
}

// Good: Using specification pattern for complex queries
@Repository
public interface UserRepository extends JpaRepository<User, Long>,
    JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);
}

// Separate specification class
public class UserSpecifications {
    public static Specification<User> isActiveUser() {
        return (root, query, cb) -> cb.equal(root.get("status"), "ACTIVE");
    }

    public static Specification<User> hasRecentLogin(LocalDateTime date) {
        return (root, query, cb) -> cb.greaterThan(root.get("lastLoginDate"), date);
    }
}
```

## Spring Boot İçin İyi Pratikler

### 1. Yapılandırma Yönetimi

SMTP adresi ve port gibi değerleri kod içine sabitlemek yerine yapılandırma özelliklerinden alın. Doğrulama kuralları da yapılandırmanın beklenen biçimde olmasını sağlar.

```java
// Bad: Hardcoded configuration
@Service
public class EmailService {
    private final String smtpServer = "smtp.company.com";
    private final int port = 587;

    public void sendEmail() {
        // Using hardcoded values
    }
}

// Good: Using configuration properties
@ConfigurationProperties(prefix = "mail")
@Validated
public record MailProperties(
    @NotBlank String smtpServer,
    @Min(1) @Max(65535) int port,
    @NotBlank String username,
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")
    String fromAddress
) {}

@Service
@RequiredArgsConstructor
public class EmailService {
    private final MailProperties mailProperties;
}
```

### 2. REST API Tasarımı

Tutarlı yanıt yapıları, uygun DTO'lar ve doğrulama kullanın. Kaynak oluşturma işlemleri için uygun HTTP durum kodunu belirtin.

```java
// Bad: Inconsistent API responses
@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping
    public User createUser(@RequestBody UserDTO dto) {
        return userService.createUser(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }
}

// Good: Consistent API responses with proper DTOs
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserResponse> createUser(
            @Valid @RequestBody UserCreateRequest request) {
        UserResponse user = userService.createUser(request);
        return ApiResponse.success(user);
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUser(@PathVariable Long id) {
        UserResponse user = userService.getUser(id);
        return ApiResponse.success(user);
    }
}
```

### 3. Servis Katmanının Düzenlenmesi

İş kurallarını, veri kaydını ve bildirimleri birbirinden ayırın. Alan olayları, farklı sorumlulukların bağımsız bileşenlere taşınmasını kolaylaştırabilir.

```java
// Bad: Mixed business logic
@Service
public class OrderService {
    public Order createOrder(OrderDTO dto) {
        validateStock(dto);
        calculatePrice(dto);
        updateInventory(dto);
        notifyUser(dto);
        return saveOrder(dto);
    }
}

// Good: Using domain events and separate services
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderDomainService domainService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public OrderResponse createOrder(OrderCreateRequest request) {
        Order order = domainService.validateAndCreateOrder(request);
        Order savedOrder = orderRepository.save(order);
        eventPublisher.publishEvent(new OrderCreatedEvent(savedOrder));
        return OrderMapper.toResponse(savedOrder);
    }
}
```

## Test Yazarken İyi Pratikler

### 1. Birim Testleri

Testin başlangıç koşulunu, yapılan işlemi ve beklenen sonucu açıkça gösterin. Given–When–Then yapısı ve açıklayıcı isimler, testin hangi davranışı doğruladığını anlatır.

```java
// Bad: Unclear test structure
@Test
void testUserCreation() {
    User user = new User();
    user.setName("John");
    userService.save(user);
    assertTrue(userService.findById(user.getId()).isPresent());
}

// Good: Clear test structure with BDD style
@Test
void givenValidUserData_whenCreatingUser_thenUserIsSavedSuccessfully() {
    // Given
    UserCreateRequest request = UserCreateRequest.builder()
        .name("John Doe")
        .email("john@example.com")
        .build();

    // When
    UserResponse response = userService.createUser(request);

    // Then
    assertThat(response)
        .isNotNull()
        .satisfies(user -> {
            assertThat(user.getName()).isEqualTo("John Doe");
            assertThat(user.getEmail()).isEqualTo("john@example.com");
        });
}
```

## Sonuç

Spring Boot uygulamalarında temiz Java kodu yazmak, okunabilir, bakımı kolay ve sağlam sistemler oluşturmak demektir. Kod kalitesini değerlendirirken onu okuyan geliştiricinin ne kadar zorlandığını da düşünmeliyiz.

### Temel Çıkarımlar

1. Spring Boot'un yerleşik yaklaşımlarını ve iyi pratiklerini izleyin.
2. Uygun istisna yönetimi ve doğrulama kullanın.
3. Servisleri odaklı tutun ve uygun yerlerde alan olaylarından yararlanın.
4. Açık ve anlamlı testler yazın.
5. Sabit değerler yerine yapılandırma özellikleri kullanın.

Bu pratikler, yalnızca çalışan değil, tüm ekibin üzerinde rahatça çalışabileceği uygulamalar oluşturmaya yardımcı olur.
