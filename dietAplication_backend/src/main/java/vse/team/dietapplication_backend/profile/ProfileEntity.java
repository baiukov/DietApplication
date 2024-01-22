package vse.team.dietapplication_backend.profile;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.user.UserEntity;

@Entity
@Table(name = "Profiles")
@Component
public class ProfileEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private UserEntity user;

    @Column(name = "name", length = 25, nullable = false)
    private String name;

    @Column(name = "surname", length = 50, nullable = false)
    private String surname;

    @Column(name = "profile_picture", nullable = false)
    private String profilePicture;

    @Column(name = "preference", nullable = false)
    private String preference;

    @Column(name = "allergy", nullable = false)
    private String allergy;

    @Column(name = "biography", columnDefinition = "TEXT", nullable = false)
    private String biography;

    @Column(name = "weight", nullable = false)
    private double weight;

    @Column(name = "height", nullable = false)
    private double height;

    @Column(name = "data_from_external_apps")
    private String dataFromExternalApps;

    public String getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public String getPreference() {
        return preference;
    }

    public String getAllergy() {
        return allergy;
    }

    public String getBiography() {
        return biography;
    }

    public double getWeight() {
        return weight;
    }

    public double getHeight() {
        return height;
    }

    public String getDataFromExternalApps() {
        return dataFromExternalApps;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public void setPreference(String preference) {
        this.preference = preference;
    }

    public void setAllergy(String allergy) {
        this.allergy = allergy;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setDataFromExternalApps(String dataFromExternalApps) {
        this.dataFromExternalApps = dataFromExternalApps;
    }
}