package com.xiaxin.blog.controller;

/**
 * ========================================================
 *
 * @Project: my-docs
 * @Version: 1.0.0
 * @class : com.xiaxin.blog.controller.UserController
 * @Author : SiTi
 * @Time : 2026-07-20 13:29:18
 * @IDE: IntelliJ IDEA 2024.1 - Interpreter: JDK 1.8
 * @Describe :
 * ========================================================
 */


import com.xiaxin.blog.dto.LoginDTO;
import com.xiaxin.blog.vo.ApiResult;
import com.xiaxin.blog.vo.UserVO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * 登录接口 静态模拟账号密码
     * 正确账号：admin / 123456
     */
    @PostMapping("/login")
    public ApiResult<UserVO> login(@RequestBody LoginDTO dto) {
        String username = dto.getUsername();
        String password = dto.getPassword();
        if ("admin".equals(username) && "123456".equals(password)) {
            UserVO mockUser = new UserVO(
                    1L,
                    "归至",
                    "/static/image/banana.svg",
                    "mock-token-20260720-guizhi-xxx"
            );
            return ApiResult.success(mockUser);
        }
        return ApiResult.fail(40003, "用户名或密码错误");
    }

    /**
     * 测试需要token鉴权接口
     */
    @PostMapping("/info")
    public ApiResult<UserVO> getUserInfo() {
        // 模拟未登录返回40001
        return ApiResult.fail(40001, "登录凭证已失效，请重新登录");
    }
}
