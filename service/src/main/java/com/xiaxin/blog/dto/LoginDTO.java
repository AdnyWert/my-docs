package com.xiaxin.blog.dto;

/**
 * ========================================================
 *
 * @Project: my-docs
 * @Version: 1.0.0
 * @class : com.xiaxin.blog.dto.LoginDTO
 * @Author : SiTi
 * @Time : 2026-07-20 13:55:16
 * @IDE: IntelliJ IDEA 2024.1 - Interpreter: JDK 1.8
 * @Describe :
 * ========================================================
 */

import lombok.Data;

@Data
public class LoginDTO {
    private String username;
    private String password;
}
