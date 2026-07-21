package com.xiaxin.blog.vo;

/**
 * ========================================================
 *
 * @Project: service
 * @Version: 1.0.0
 * @class : com.xiaxin.blog.vo.UserVO
 * @Author : SiTi
 * @Time : 2026-07-20 13:09:16
 * @IDE: IntelliJ IDEA 2024.1 - Interpreter: JDK 1.8
 * @Describe :
 * ========================================================
 */

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVO {
    // 用户id
    private Long id;
    // 用户名
    private String username;
    // 头像地址
    private String avatar;
    // 登录凭证token
    private String token;
}