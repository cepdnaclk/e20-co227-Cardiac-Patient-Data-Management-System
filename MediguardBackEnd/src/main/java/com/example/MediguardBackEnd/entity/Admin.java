package com.example.MediguardBackEnd.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity(name = "Admin")
@DynamicInsert
@DynamicUpdate
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id", updatable = false)
    private Long AdminId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity users;

    public Admin() {
    }

    public Admin(Long adminId, UserEntity users) {
        AdminId = adminId;
        this.users = users;
    }

    public Long getAdminId() {
        return AdminId;
    }

    public void setAdminId(Long adminId) {
        AdminId = adminId;
    }

    public UserEntity getUsers() {
        return users;
    }

    public void setUsers(UserEntity users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "AdminId=" + AdminId +
                ", users=" + users +
                '}';
    }
}
