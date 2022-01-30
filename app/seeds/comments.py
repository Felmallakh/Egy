from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
        user_id=2,
        photo_id=1,
        content='WOW'
    )
    comment2 = Comment(
        user_id=1,
        photo_id=1,
        content='Interesting'
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
