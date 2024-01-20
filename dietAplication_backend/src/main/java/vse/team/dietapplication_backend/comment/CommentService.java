package vse.team.dietapplication_backend.comment;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vse.team.dietapplication_backend.user.UserEntity;
import vse.team.dietapplication_backend.user.UserRepository;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    public String createComment(CommentEntity comment, String userId) {
        UserEntity user = null;
        try {
            user = userRepository.getById(userId);
        } catch (Exception e) {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }
        comment.setAuthor(user);
        return this.commentRepository.save(comment);
    }

    public void updateComment(String commentId, CommentEntity updatedComment) {
        CommentEntity oldComment = commentRepository.getById(commentId);
        if (oldComment != null) {
            oldComment.setContent(updatedComment.getContent());
            commentRepository.update(oldComment);
        } else {
            throw new EntityNotFoundException("Comment not found with ID: " + commentId);
        }
    }

    public void deleteComment(String commentId) {
        commentRepository.deleteById(commentId);
    }

    public CommentEntity getCommentById(String id) {
        return commentRepository.getById(id);
    }
}
