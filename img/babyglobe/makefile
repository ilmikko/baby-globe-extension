all: \
	baby_globe_book.gif \
	baby_globe_camera.gif \
	baby_globe_camera_click.gif \
	baby_globe_celebration.gif \
	baby_globe_celebration_balloons.gif \
	baby_globe_celebration_confetti.gif \
	baby_globe_headphones.gif \
	baby_globe_headphones_click.gif \
	baby_globe_laptop.gif \
	baby_globe_newspaper.gif \
	baby_globe_outer_space.gif \
	baby_globe_phone.gif \
	baby_globe_synthesizer.gif \
	baby_globe_synthesizer_click.gif \
	;

clean:
	rm -f temp_frame*.png

# Baby Globe idle animations.

baby_globe_book.gif:
	magick originals/baby_globe_book_full.gif -coalesce -repage 0x0 -crop 550x550+190+235 -resize 128x128 +repage baby_globe_book.gif

baby_globe_camera.gif:
	magick originals/baby_globe_camera_full.gif -coalesce -repage 0x0 -crop 760x760+130+50 -resize 128x128 +repage temp_frame%03d.png
	# This one is made up of frames 0..71 of the full animation. Remove the rest.
	for i in $$(seq 72 95); do rm temp_frame"$$(printf "%03d" "$$i")".png; done
	magick -delay 1x20 temp_frame*.png -background transparent -loop 0 -set dispose Background -fuzz 5% baby_globe_camera.gif
	rm temp_frame*.png

baby_globe_camera_click.gif:
	magick originals/baby_globe_camera_full.gif -coalesce -repage 0x0 -crop 760x760+130+50 -resize 128x128 +repage temp_frame%03d.png
	# Move frames 0..72 to the end of the animation.
	for i in $$(seq 0 72); do mv temp_frame{,1}"$$(printf "%03d" "$$i")".png; done
	magick -delay 1x20 temp_frame*.png -background transparent -loop 0 -set dispose Background -fuzz 5% baby_globe_camera_click.gif
	rm temp_frame*.png

baby_globe_celebration.gif:
	magick originals/baby_globe_celebration_full.gif -coalesce -repage 0x0 -crop 650x650+230+175 -resize 128x128 +repage baby_globe_celebration.gif

baby_globe_celebration_balloons.gif:
	magick originals/baby_globe_celebration_balloons_full.gif -coalesce -repage 0x0 -crop 650x650+230+175 -resize 128x128 +repage baby_globe_celebration_balloons.gif

baby_globe_celebration_confetti.gif:
	magick originals/baby_globe_celebration_confetti_full.gif -coalesce -repage 0x0 -crop 650x650+230+175 -resize 128x128 +repage baby_globe_celebration_confetti.gif

baby_globe_headphones.gif:
	magick originals/baby_globe_headphones_full.gif -coalesce -repage 0x0 -crop 760x760+130+70 -resize 128x128 +repage temp_frame%03d.png
	# This one is made up of frames 0..23 of the full animation. Remove the rest.
	for i in $$(seq 24 77); do rm temp_frame"$$(printf "%03d" "$$i")".png; done
	magick -delay 1x20 temp_frame*.png -background transparent -loop 0 -set dispose Background -fuzz 5% baby_globe_headphones.gif
	rm temp_frame*.png

baby_globe_headphones_click.gif:
	magick originals/baby_globe_headphones_full.gif -coalesce -repage 0x0 -crop 760x760+130+70 -resize 128x128 +repage temp_frame%03d.png
	# Move frames 0..23 to the end of the animation.
	for i in $$(seq 0 23); do mv temp_frame{,1}"$$(printf "%03d" "$$i")".png; done
	magick -delay 1x20 temp_frame*.png -background transparent -loop 0 -set dispose Background -fuzz 5% baby_globe_headphones_click.gif
	rm temp_frame*.png

baby_globe_laptop.gif:
	magick originals/baby_globe_laptop_full.gif -coalesce -repage 0x0 -crop 620x620+170+285 -resize 128x128 +repage baby_globe_laptop.gif

baby_globe_newspaper.gif:
	magick originals/baby_globe_newspaper_full.gif -coalesce -repage 0x0 -crop 620x620+190+225 -resize 128x128 +repage baby_globe_newspaper.gif

baby_globe_outer_space.gif:
	magick originals/baby_globe_outer_space_full.gif -coalesce -repage 0x0 -crop 780x780+140+85 -resize 128x128 +repage baby_globe_outer_space.gif

baby_globe_phone.gif:
	magick originals/baby_globe_phone_full.gif -coalesce -repage 0x0 -crop 580x580+260+285 -resize 128x128 +repage baby_globe_phone.gif

baby_globe_synthesizer.gif:
	magick originals/baby_globe_synthesizer_full.gif -coalesce -repage 0x0 -crop 780x780+180+0 -resize 128x128 +repage temp_frame%03d.png
	# Frames: 0..143
	# This one is made up of frames 0..47 of the full animation. Remove the rest.
	for i in $$(seq 48 143); do rm temp_frame"$$(printf "%03d" "$$i")".png; done
	magick -delay 1x20 temp_frame*.png -background transparent -loop 0 -set dispose Background -fuzz 5% baby_globe_synthesizer.gif
	rm temp_frame*.png

baby_globe_synthesizer_click.gif:
	magick originals/baby_globe_synthesizer_full.gif -coalesce -repage 0x0 -crop 780x780+180+0 -resize 128x128 +repage temp_frame%04d.png
	# Frames: 0..143
	# Move frames 0..47 to the end of the animation.
	for i in $$(seq 0 47); do mv temp_frame{,1}"$$(printf "%04d" "$$i")".png; done
	magick -delay 1x20 temp_frame*.png -background transparent -loop 0 -set dispose Background -fuzz 5% baby_globe_synthesizer_click.gif
	rm temp_frame*.png
