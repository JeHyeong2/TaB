package com.ssafy.tab.service;

import com.ssafy.tab.domain.Board;
import com.ssafy.tab.dto.BoardDto;
import com.ssafy.tab.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    //게시글 등록, 수정, 삭제, 게시글 클릭 시 자세히 보기, 게시글 머리말대로 가져오기

    //게시글 등록
    public Board createBoard(Board board){
        Board saveBoard = boardRepository.save(board);
        return saveBoard;
    }

    //게시글 삭제
    public void deleteBoard(Board board){
        boardRepository.delete(board);
    }

    //게시글 수정
    public Board modifyBoard(Long id, BoardDto boardDto){
        Optional<Board> selectBoard = boardRepository.findById(id);
        Board originBoard = selectBoard.get();
        originBoard.setTitle(boardDto.getTitle());
        originBoard.setContent(boardDto.getContent());
        originBoard.setCreateTime(boardDto.getCreateTime());
        return originBoard;
    }

    //게시글 머리말대로 가져오기


}