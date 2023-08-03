package com.ssafy.tab.domain;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice {

    /*
    id: 공지사항 글 번호
    user: 작성자 NO
    title: 공지사항 제목
    content: 공지사항 내용
    createTime: 공지사항 작성시간
     */

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTICE_NO")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;

    @Column(name = "TITLE", columnDefinition="TEXT")
    private String title;

    @Column(name = "CONTENT", columnDefinition="TEXT")
    private String content;

    @Column(name = "CREATE_TIME")
    private LocalDateTime createTime;

    public void changeTitle(String title){
        this.title = title;
    }

    public void changeContent(String content){
        this.content = content;
    }

    public void changeTime(LocalDateTime createTime){
        this.createTime = createTime;
    }

    public Notice(User user, String title, String content, LocalDateTime createTime) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Notice{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
