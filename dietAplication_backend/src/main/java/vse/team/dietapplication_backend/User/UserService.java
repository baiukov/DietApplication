package vse.team.dietapplication_backend.User;

import org.springframework.stereotype.Component;

@Component
public class UserService {

    public Integer getAge(String yearOfBirth) {
        UserEntity userEntity = new UserEntity();
        userEntity.setYearOfBirth(yearOfBirth);

        UserRepository userRepository = new UserRepository();
        String id = userRepository.save(userEntity);

        UserEntity savedUser = userRepository.getById(id);

        return savedUser.getCurrentYear() - Integer.parseInt(savedUser.getYearOfBirth());
    }
}
