from app.models import db, Photo


# Adds a demo user, you can add other users here if you want
def seed_photos():
    demo1 = Photo(
        user_id=1,
        album_id=1,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/932226920534392912/0110.jpeg',
        title='Pyramids',
        description="3 Pyramids"
    )

    demo2 = Photo(
        user_id=1,
        album_id=1,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/932226921012559892/018.jpg',
        title='Pyramids and Sphinx',
        description="Sphinx"
    )

    demo3 = Photo(
        user_id=1,
        album_id=1,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/932226922589585448/011.jpg',
        title='Pyramids view',
        description="Pyramids-Camel"
    )

    all_photos = [demo1, demo2, demo3]

    for album in all_photos:
        db.session.add(album)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
