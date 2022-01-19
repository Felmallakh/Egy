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

    demo4 = Photo(
        user_id=1,
        album_id=2,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/933139037043187792/hurghada.jpg',
        title='Hurghada Marina',
        description=""
    )

    demo5 = Photo(
        user_id=1,
        album_id=2,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/933139037319991306/Hurghada.jpg',
        title='Hurghada Marina',
        description="Red sea Marina's"
    )

    demo6 = Photo(
        user_id=1,
        album_id=2,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/933139037538119700/Hurghada02.jpg',
        title='Red Sea Water',
        description=""
    )

    demo7 = Photo(
        user_id=1,
        album_id=3,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/933139735914901584/Karnak-Temple-Complex.jpg',
        title='Temples',
        description="Karnak Temple"
    )

    demo8 = Photo(
        user_id=1,
        album_id=3,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/933139736183316480/Karnak-Temple-Complex02.jpg',
        title='Karnak Complex Temple',
        description="Temple"
    )

    demo9 = Photo(
        user_id=1,
        album_id=3,
        photoURL='https://cdn.discordapp.com/attachments/919391399269515305/933139736397238312/Luxor.jpg',
        title='Temple Complex',
        description="Luxor"
    )

    all_photos = [demo1, demo2, demo3, demo4, demo5, demo6, demo7, demo8, demo9]

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
