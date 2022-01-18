from app.models import db, Album


# Adds a demo user, you can add other users here if you want
def seed_albums():
    demo1 = Album(
        user_id=1,
        title = 'Pyramids',
        description="Pyramids & Sphinx"
    )

    demo2 = Album(
        user_id=1,
        title='Red Sea',
        description="Sharm eEl Sheikh, Hurghada, Dahab, Taba, Sahl Hasheesh"
    )

    demo3 = Album(
        user_id=1,
        title='Ancient Egyptian Cities',
        description="Luxor, Aswan"
    )

    all_albums = [demo1, demo2, demo3]

    for album in all_albums:
        db.session.add(album)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_albums():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
