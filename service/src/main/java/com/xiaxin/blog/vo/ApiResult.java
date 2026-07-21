package com.xiaxin.blog.vo;

import lombok.Data;

/**
 * 全局统一返回格式
 * {code: number, msg: string, data: T, timestamp}
 */
@Data
public class ApiResult<T> {
    // 业务码 20000成功，40xxx异常，50xxx服务错误
    private Integer code;
    // 提示信息
    private String msg;
    // 返回数据体
    private T data;
    // 时间戳
    private Long timestamp;

    // 构造私有，仅通过静态方法创建
    private ApiResult() {
        this.timestamp = System.currentTimeMillis();
    }

    // 成功响应 带数据
    public static <T> ApiResult<T> success(T data) {
        ApiResult<T> result = new ApiResult<>();
        result.setCode(20000);
        result.setMsg("操作成功");
        result.setData(data);
        return result;
    }

    // 成功响应 无返回数据
    public static <T> ApiResult<T> success() {
        return success(null);
    }

    // 业务失败自定义提示
    public static <T> ApiResult<T> fail(Integer code, String msg) {
        ApiResult<T> result = new ApiResult<>();
        result.setCode(code);
        result.setMsg(msg);
        result.setData(null);
        return result;
    }
}